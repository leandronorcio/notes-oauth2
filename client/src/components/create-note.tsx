import { Button } from '@/components/ui/button';
import { FilePlus, Loader2 } from 'lucide-react';
import { Form, useNavigation } from 'react-router-dom';

// This component is rendered on the `/notes` route, so it uses that route's `action` function
export function CreateNote() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="POST">
      <Button
        className="flex gap-2 w-full"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" /> Creating note...
          </>
        ) : (
          <>
            <FilePlus /> Create Note
          </>
        )}
      </Button>
    </Form>
  );
}
