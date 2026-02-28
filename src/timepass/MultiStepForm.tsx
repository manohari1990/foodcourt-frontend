import { useState, useRef } from 'react';
import StepOne from './StepOne'
import StepTwo from './StepTwo';
import StepThree from './StepThree';


const getInitialFormData = () => {
    const savedFormData = localStorage.getItem('formData')
    console.log(savedFormData)
    return savedFormData && savedFormData != 'undefined' ? JSON.parse(savedFormData || '') : {}
}
export default function MultiStepForm() {

    const [step, setStep] = useState(() => {
        const savedStep = localStorage.getItem('currentStep');
        return savedStep ? parseInt(savedStep) : 1;
    });
    const formRef = useRef(getInitialFormData())

    console.log(formRef.current)

    const saveFormData = () => {
        localStorage.setItem('formData', JSON.stringify(formRef.current))
        localStorage.setItem('currentStep', step.toString())
    }

    const nextStep = () => {
        saveFormData()
        setStep(p => {
            const next = p + 1
            localStorage.setItem('currentStep', next.toString())
            return next
        })
    }
    const prevStep = () => {
        saveFormData()
        setStep(p => {
            const prev = p - 1
            localStorage.setItem('currentStep', prev.toString())
            return prev
        })
    }

    const handleSubmit = async () => {
        //await api call
        localStorage.setItem('currentStep', '1')
        localStorage.setItem('formData', JSON.stringify({}))
        setStep(1)
        formRef.current = {}
    }


    return (
        <div className="form-container">
            <h2>Step {step} of 3</h2>
            {step === 1 && <StepOne ref={formRef} next={nextStep} />}
            {step === 2 && <StepTwo ref={formRef} next={nextStep} prev={prevStep} />}
            {step === 3 && <StepThree ref={formRef} prev={prevStep} handleSubmit={handleSubmit} />}
        </div>
    );
}