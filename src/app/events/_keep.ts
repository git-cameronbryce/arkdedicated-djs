// Placeholder so CommandKit emits the `.commandkit/app/events` directory.
// CommandKit's EventsRouter.scan() does an unguarded readdir on that path and
// crashes if it doesn't exist. A bare file here (not a subdirectory) makes the
// directory exist without registering any event handler — scan() only recurses
// into subdirectories, so this file is read and skipped.
export {};
