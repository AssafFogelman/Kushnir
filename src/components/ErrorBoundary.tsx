import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ error }: { error: Error | null }) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.href = '/';
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-2xl font-bold mb-4'>Something went wrong</h1>
      <p className='text-gray-600 mb-6 text-center'>
        We're sorry, but something unexpected happened. You can try refreshing the page or return to
        the home page.
      </p>
      {error && (
        <pre className='bg-gray-100 p-4 rounded mb-6 text-sm overflow-auto max-w-full'>
          {error.message}
        </pre>
      )}
      <div className='flex gap-4'>
        <Button onClick={handleRefresh} variant='default'>
          Refresh Page
        </Button>
        <Button onClick={() => navigate('/')} variant='outline'>
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
