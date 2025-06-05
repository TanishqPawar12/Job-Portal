import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
    return (
        <div className='container mx-auto p-4'>
            <div>
                <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm '>
                    <thead>
                        <tr className='border-b border-gray-200'>
                            <th className='py-2 px-4 text-left'>#</th>
                            <th className='py-2 px-4 text-left'>User name</th>
                            <th className='py-2 px-4 text-left max-sm:hidden'>Job Title</th>
                            <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
                            <th className='py-2 px-4 text-left'>Resume</th>
                            <th className='py-2 px-4 text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
                        {viewApplicationsPageData.map((applicant, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 text-center">{index + 1}</td>

                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={applicant.imgSrc} alt="" className="w-10 h-10 rounded-full object-cover" />
                                    <span>{applicant.name}</span>
                                </td>

                                <td className="px-6 py-4">{applicant.jobTitle}</td>
                                <td className="px-6 py-4">{applicant.location}</td>

                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="inline-flex items-center gap-1 rounded bg-blue-50 px-3 py-1 text-blue-500 border border-blue-100 text-sm"
                                    >
                                        Resume
                                        <img src={assets.resume_download_icon} className="w-4 h-4" alt="download" />
                                    </a>
                                </td>

                                <td className="px-6 py-4">
                                    <div className='relative inline-block text-left group'>
                                        <button className='text-gray-500 action-button'>...</button>
                                        <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                                            <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                                            <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewApplications
