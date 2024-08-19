import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
};

function Portal({ children }: PortalProps) {
  return createPortal(children, document.body);
}
export default Portal;