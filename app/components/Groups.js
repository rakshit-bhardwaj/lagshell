import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './components.css'

const Groups = ({ setSelectedGroup, user, supabase }) => {
    const [groups, setGroups] = useState([]);
    const [showAddGroup, setShowAddGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    const fetchGroups = async () => {
        const { data, error } = await supabase
            .from('groups')
            .select('*')
            .eq('email', user);

        if (error) {
            console.error(error);
        } else {
            setGroups(data);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleGroupClick = (group) => {
        setSelectedGroup(group.id);  
    };

    const handleAddGroup = async () => {
        setShowAddGroup(true);
    };

    const handleCancelAddGroup = () => {
        setShowAddGroup(false);
    };

    const handleSaveGroup = async () => {
        console.log(newGroupName,user)
        const { data, error } = await supabase
            .from('groups')
            .insert([{ name: newGroupName, email: user }]);

        if (error) {
            console.error(error);
        } else {
            console.log(data);
            //setGroups([...groups, data[0]]);
            setShowAddGroup(false);
            setNewGroupName('');
            fetchGroups(); // Call fetchGroups after handleSaveGroup is executed
        }
    };
    
    const handleDeleteGroup = async (id) => {
        console.log("deleting group with id: ", id);
        const { data, error } = await supabase
            .from('groups')
            .delete()
            .eq('id', id);

        if (error) {
            alert('make sure you delete all the hosts in the group before deleting the group')
        } else {
            console.log(data);
            fetchGroups();
        }
    };

    return (
        <div className="flex flex-col groups">
            {groups.map((group) => (
                <div
                    key={group.name}
                    className="bg-slate text-white rounded"
                    onClick={() => handleGroupClick(group)}
                >
                    <button className="text-white rounded w-32 left-margin">
                    {group.name}
                    </button>
                    
                    <button className="delete-button left-margin" onClick={() => handleDeleteGroup(group.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            ))}
            {showAddGroup ? (
                <div className='flex flex-col addgroup'>
                    <input
                        type="text"
                        value={newGroupName}
                        className="text-black w-32"
                        onChange={(e) => setNewGroupName(e.target.value)}
                    />
                    <button className="bg-slate text-white rounded w-32" onClick={handleSaveGroup}>Save</button>
                    <button className="bg-slate text-white rounded w-32" onClick={handleCancelAddGroup}>Cancel</button>
                </div>
            ) : (
                <button onClick={handleAddGroup} className="bg-slate text-white rounded w-32 left-margin">Add Group</button>
            )}
        </div>
    );
};

export default Groups;

