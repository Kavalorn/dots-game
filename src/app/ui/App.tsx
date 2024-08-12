
import { Terminal } from 'lucide-react';
import './styles.global.css';
import { Alert, AlertTitle, AlertDescription } from '~shared/components/ui/alert';

export function App() {
  return (
    <div test-id="test-root">
      <div className='p-4 w-[400px]'>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Hello world!</AlertTitle>
          <AlertDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem voluptate aut beatae consectetur voluptatibus? Molestias, consequatur corrupti. Fuga ducimus repellendus reprehenderit porro quaerat ab quas deleniti, nulla, aut fugiat sequi.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
