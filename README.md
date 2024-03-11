LagShell is an SSH session management tool built using Tauri (Next.js + Rust). It utilizes Supabase to store sessions, which can be accessed using Supabase authentication. Users can create multiple groups and add multiple sessions in each group, and even initiate connections to all of them at once.

You can try out the release, but it is highly recommended that you only add private sessions or use private keys to log in since the database instance is not protected. It is better to create your own Supabase and add its public URL and public anonymous key in the .env.local file in the project directory:

NEXT_PUBLIC_SUPABASE_URL=xxxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx

To get started:

1. Install Node.js and Rust.
2. Install PuTTY.
3. Clone the repository.
4. Run npm install in the directory.
5. Navigate inside the src-tauri directory and run the cargo update command.
6. Go back to the project directory and run npm run tauri dev.
7. To create a build, run npm run tauri build.
