import { Navigate } from 'react-router-dom';


interface RutasProtegidasProps {
  children: React.ReactNode;
  allowedRoles?: number[];
}

const RutasProtegidas = ({ children, allowedRoles }: RutasProtegidasProps) => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.roleId)) {
    return <Navigate to="/reportes" />;
  }

  return <>{children}</>;
}

export default RutasProtegidas;