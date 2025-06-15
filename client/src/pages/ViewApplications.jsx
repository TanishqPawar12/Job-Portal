import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Loading from '../components/Loading'

const ViewApplications = () => {

    const {backendUrl, companyToken} = useContext(AppContext)

    const [applicants, setApplicants] = useState(false)

    // Function to fetch company Job Applicantions data
    const fetchCompanyJobApplications = async () => {

        try {

            const {data} = await axios.get(backendUrl + '/api/company/applicants',
                {headers: {token: companyToken}}
            )

            if (data.success) {
                setApplicants(data.applications.reverse())
            } else {
                toast.error(data.message)
            }


        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to update job Applicantions status
    const changeJobApplicationStatus = async (id, status) => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/company/change-status',
                {id, status},
                {headers: {token: companyToken}}
            )

            if (data.success) {
                fetchCompanyJobApplications()
            } else { 
                toast.error(data.success)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (companyToken) {
            fetchCompanyJobApplications()
        }
    },[companyToken])


    return applicants ? applicants.length === 0 ? ( 
        <div className='flex items-center justify-center h-[70vh]'>
        <p className='text-xl sm:text-2xl'>No Applicantions Available</p>
        </div>
    ) : (
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
                        {applicants.filter( item => item.jobId && item.userId).map((applicant, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 text-center">{index + 1}</td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={applicant.userId.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                                    <span>{applicant.userId.name}</span>
                                </td>

                                <td className="px-6 py-4">{applicant.jobId.title}</td>
                                <td className="px-6 py-4">{applicant.jobId.location}</td>

                                <td className="px-6 py-4">
                                    <a
                                        href={applicant.userId.resume}
                                        target="_blank"
                                        className="inline-flex items-center gap-1 rounded bg-blue-50 px-3 py-1 text-blue-500 border border-blue-100 text-sm"
                                    >
                                        Resume
                                        <img src={assets.resume_download_icon} className="w-4 h-4" alt="download" />
                                    </a>
                                </td>

                                <td className="px-6 py-4">
                                    {applicant.status === "Pending"
                                    ? <div className='relative inline-block text-left group'>
                                        <button className='text-gray-500 action-button'>...</button>
                                        <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                                            <button onClick={() => changeJobApplicationStatus(applicant._id,'Accepted')} className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                                            <button onClick={() => changeJobApplicationStatus(applicant._id,'Rejected')} className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                                        </div>
                                    </div>
                                    : <div>{applicant.status}</div>
                                    }
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ) : <Loading />
}

export default ViewApplications
