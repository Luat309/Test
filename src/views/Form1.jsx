import useForm from '../hooks/useForm';

const Form1 = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const submitHandler = (data) => {
        console.log(data);
    };

    console.log(errors);

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='form-group'>
                <label>Name</label>
                <input {...register('name', true)} />
                <span>{errors['name']}</span>
            </div>

            <div className='form-group'>
                <label>Age</label>
                <input {...register('age', true)} />
                <span>{errors['age']}</span>
            </div>

            <button type='submit'>Submit</button>
        </form>
    );
};

export default Form1;
