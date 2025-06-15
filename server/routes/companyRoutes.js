import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router()

//register a company
router.post('/register', upload.single('logo'), registerCompany);

//Company login 
router.post('/login', loginCompany)

//Get compamy data
router.get('/company', protectCompany, getCompanyData)

//Post a job
router.post('/post-job', protectCompany, postJob)

//Get Applicants data of company
router.get('/applicants', protectCompany, getCompanyJobApplicants)

//Get company job listed
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)

//change applications status
router.post('/change-status', protectCompany, changeJobApplicationStatus)

//Change Applicants visibility
router.post('/change-visibility', protectCompany, changeVisibility)

export default router