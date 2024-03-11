import React, { useEffect, useState } from 'react';
import './components.css'
import { invoke } from '@tauri-apps/api/tauri'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Sessions = ({ selectedGroup, supabase }) => {
    const [hosts, setHosts] = useState([]);
    const [showAddHosts, setShowAddHosts] = useState(false);
    const [newHost, setNewHost] = useState({
        name: '',
        ip: '',
        port: '',
        username: '',
        password: '',
        keypair: false
    });

    const handleLogSession = (session) => {
        console.log(session);
        try {
            invoke('connect', { ip: session.ip, port: session.port, username: session.username, password: session.password, keypair: session.keypair})
        } catch (e) {
            console.log(e)
        }
    };

    const fetchHosts = async (group) => {
        const { data, error } = await supabase
            .from('ssh_hosts')
            .select('*')
            .eq('group_id', group);

        if (error) {
            console.error(error);
        } else {
            setHosts(data);
        }
    };

    useEffect(() => {
        if (selectedGroup) {
            fetchHosts(selectedGroup);
        }
    }, [selectedGroup])

    const handleAddHosts = () => {
        setShowAddHosts(true);
    };

    const handleCancelAddHosts = () => {
        setShowAddHosts(false);
        setNewHost({
            name: '',
            ip: '',
            port: '',
            username: '',
            password: '',
            keypair: false
        });
    };

    const handleSaveHosts = async () => {
        const { data, error } = await supabase
            .from('ssh_hosts')
            .insert([{ name: newHost.name, ip: newHost.ip, port: newHost.port, username: newHost.username, password: newHost.password,keypair: newHost.keypair, group_id: selectedGroup }]);

        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }

        // Fetch updated hosts list
        await fetchHosts(selectedGroup);

        // Reset newHost and hide the add hosts form
        handleCancelAddHosts();
    };

    const handleDeletehost = async (id) => {
        console.log(id)
        const { data, error } = await supabase
            .from('ssh_hosts')
            .delete()
            .eq('id', id);
        if (error) {
            alert(error.message);
        } else {
            console.log(data);
            await fetchHosts(selectedGroup);
        }
    };

    const connectAll = async () => {
        hosts.forEach((host) => {
            console.log(host)
            invoke('connect', { ip: host.ip, port: host.port, username: host.username, password: host.password, keypair: host.keypair})
        })
    };
    return (
        <div className="sessionclass">
            {showAddHosts == true ? (
                <div className="flex flex-col groups">
                    <input
                        type="text"
                        className="text-black"
                        placeholder="Name"
                        value={newHost.name}
                        onChange={(e) => setNewHost({ ...newHost, name: e.target.value })}
                    />
                    <input
                        type="text"
                        className="text-black"
                        placeholder="IP"
                        value={newHost.ip}
                        onChange={(e) => setNewHost({ ...newHost, ip: e.target.value })}
                    />
                    <input
                        type="text"
                        className="text-black"
                        placeholder="Port"
                        value={newHost.port}
                        onChange={(e) => setNewHost({ ...newHost, port: e.target.value })}
                    />
                    <input
                        type="text"
                        className="text-black"
                        placeholder="Username"
                        value={newHost.username}
                        onChange={(e) => setNewHost({ ...newHost, username: e.target.value })}
                    />
                    <input
                        type="password"
                        className="text-black"
                        placeholder="Password"
                        value={newHost.password}
                        onChange={(e) => setNewHost({ ...newHost, password: e.target.value })}
                    />
                    <div className="flex flex-row justify-center gap-x-11">
                    <label>Use Keypair</label>
                    <input
                        type="checkbox"
                        checked={newHost.keypair}
                        onChange={(e) => setNewHost({ ...newHost, keypair: e.target.checked })}
                    />
                    </div>
                    <button onClick={handleSaveHosts} className=''>Save</button>
                    <button onClick={handleCancelAddHosts} className=''>Cancel</button>
                </div>
            ): (
                <div className='flex flex-row hosts'>
                    {hosts.length === 0 ? (
                    <div>
                        <p>There are no hosts in this group.</p>
                    </div>
                    ) : (
                        hosts.map((session, index) => (
                            <div key={index} className="w-60"> {/* Updated padding value */}
                                <div className="rounded-lg shadow-lg p-4 flex flex-col items-center text-white card1">
                                    <h3 className="text-xl font-semibold mb-2">{session.name}</h3>
                                    <p className="text-gray-300 mb-2">IP: {session.ip}</p>
                                    <p className="text-gray-300 mb-4">User: {session.username}</p>
                                    <button
                                        className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                                        onClick={() => handleLogSession(session)}
                                    >
                                        Log Session
                                    </button>
                                    <button className="delete-button" onClick={() => handleDeletehost(session.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                     
                </div>
            )}
            {showAddHosts == false && hosts.length !== 0 && (
                        <button 
                        className='h-10 conallhosts'
                        onClick={() => connectAll()}>
                            Connect to all hosts
                        </button>
                    )} 
            <button onClick={handleAddHosts} className='addhosts'>Add SSH Hosts</button>
        </div>
    );
};

export default Sessions;

