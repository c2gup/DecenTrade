// src/pages/CreateNFT.jsx
import { React, useState } from 'react'
import PropTypes from 'prop-types'
import { connectWallet, createNFT, getNFTContract } from '../utils/ethereum'
import { ethers } from 'ethers'

const nftAddress = import.meta.env.VITE_NFT_ADDRESS
const marketplaceAddress = import.meta.env.VITE_MARKET_ADDRESS

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY

const CreateNFT = ({ wallet }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        file: null,
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { name, description, price, file } = formData

            // Ensure all required fields are filled
            if (!name || !description || !price || !file) {
                throw new Error('All fields are required')
            }

            const signer = await connectWallet()

            try {
                const tokenId = await createNFT(
                    signer,
                    name,
                    description,
                    price,
                    file,
                    nftAddress,
                    marketplaceAddress
                )
                console.log('NFT created and listed with token ID:', tokenId)
            } catch (error) {
                console.error('Failed to create and list NFT:', error)
            }
        } catch (error) {
            console.error('Error creating NFT:', error)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Create NFT</h1>
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-lg font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full text-[14px] rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md focus:outline-none focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] transition duration-300"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-lg font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 text-[14px] block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md focus:outline-none focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] transition duration-300"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="price"
                        className="block text-lg font-medium text-gray-700"
                    >
                        Price (ETH)
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                        className="mt-1 block text-[14px] text-black w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md focus:outline-none focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] transition duration-300"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="file"
                        className="block text-lg font-medium text-gray-700"
                    >
                        File
                    </label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create NFT
                </button>
            </form>
        </div>
    )
}
CreateNFT.propTypes = {
    wallet: PropTypes.object.isRequired,
    // wallet: PropTypes.object,
}

export default CreateNFT
