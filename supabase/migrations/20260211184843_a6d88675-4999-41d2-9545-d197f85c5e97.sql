
-- Add CHECK constraints for field length validation at database level
ALTER TABLE public.newsletter_subscribers
ADD CONSTRAINT email_length CHECK (length(email) <= 255);

ALTER TABLE public.newsletter_subscribers
ADD CONSTRAINT name_length CHECK (length(name) <= 100);

-- Add basic email format validation trigger
CREATE OR REPLACE FUNCTION public.validate_email_format()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.email !~ '^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_newsletter_email
BEFORE INSERT ON public.newsletter_subscribers
FOR EACH ROW
EXECUTE FUNCTION public.validate_email_format();
