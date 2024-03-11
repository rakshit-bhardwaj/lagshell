Lagshell is a ssh session management tool built using tauri (nextjs + rust).
It uses supabase to store the sessions, which can be accessed using supabase auth.
Users can create multiple groups and add multiple sessions in each groups and can even iniate connection to all of them at once.

You can try out the release but it is highly recommended that you only add private sessions or use private keys to login, since db instance is not protected.
It is better to create your own supabase and add its public url and public anon key in .env.local file in project directory =>

NEXT_PUBLIC_SUPABASE_URL=xxxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx

to get started

1. install nodejs and rust.
2. install putty
3. clone repo
4. run npm install in the directory
5. cd inside src-tauri directory && run cargo update command
6. go back to project dir & run npm run tauri dev
7. to create build run npm run tauri build
