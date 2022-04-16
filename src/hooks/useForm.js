import { useState } from 'react';

const options = {
    required: {
        value: true, 
        message: 'Field id required'
    },
    max: {
        value: 10,
        message: ''
    },
    min: {
        value: 3,
        message: ''
    },
    maxLength: {
        value: 3,
        message: ''
    },
    minLength: {
        value: 10,
        message: ''
    }
};

const defaultOptions = {
    required: true,
    max: 10,
    min: 3,
    maxLength: 10,
    minLength: 3,
}

const useForm = () => {
    const requireFields = {};

    const [formState, setFormState] = useState({
        errors: {},
        data: {},
    });

    const register = (fieldName, required = false) => {
        if (required) {
            requireFields[fieldName] = fieldName;
        }

        const handleChange = (e) => {
            setFormState((preState) => {
                return {
                    data: {
                        ...preState.data,
                        [fieldName]: e.target.value,
                    },
                    errors: {
                        ...preState.errors,
                        [fieldName]: e.target.value
                            ? null
                            : 'Field is required',
                    },
                };
            });
        };

        return {
            onChange: handleChange,
        };
    };

    const handleSubmit = (submitHandler) => (e) => {
        e.preventDefault();

        const { data } = formState;
        let isValid = true,
            errors = {};

        Object.keys(requireFields).forEach((field) => {
            if (!data[field]) {
                isValid = false;
                errors[field] = 'Field is required';
            }
        });

        if (!isValid) {
            setFormState((preState) => {
                return {
                    ...preState,
                    errors,
                };
            });

            return;
        }

        submitHandler(formState.data);
    };

    return {
        register,
        formState,
        handleSubmit,
    };
};

export default useForm;
