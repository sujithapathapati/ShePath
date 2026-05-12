import { useNavigate } from 'react-router-dom'; // ✅ add this

const EmployerAuth = ({ isOpen, onClose }: EmployerAuthProps) => {
  const navigate = useNavigate(); // ✅ add this
  const { state, dispatch } = useApp();

  const handleLogin = () => {
    // ✅ validate inputs or use actual auth logic
    const employer = {
      id: '1',
      companyName: 'ABC Corp',
      contactPerson: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: 'Hyderabad',
      website: 'https://abc.com',
    };

    dispatch({ type: 'SET_EMPLOYER', payload: employer });

    // ✅ redirect to dashboard
    navigate('/employer-dashboard');
    onClose(); // optional: to close modal or drawer
  };
