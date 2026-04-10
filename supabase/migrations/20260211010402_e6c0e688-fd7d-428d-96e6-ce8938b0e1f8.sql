-- Explicitly deny UPDATE on newsletter_subscribers for all users
CREATE POLICY "No public update access"
ON public.newsletter_subscribers
FOR UPDATE
USING (false);

-- Explicitly deny DELETE on newsletter_subscribers for all users
CREATE POLICY "No public delete access"
ON public.newsletter_subscribers
FOR DELETE
USING (false);
