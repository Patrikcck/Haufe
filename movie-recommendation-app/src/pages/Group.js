import React, { useEffect, useState } from 'react';
import GroupService from '../services/GroupService';

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupIdToJoin, setGroupIdToJoin] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await GroupService.getGroups();
        setGroups(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGroups();
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const newGroup = await GroupService.createGroup(groupName);
      setGroups([...groups, newGroup]);
      setGroupName('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    try {
      const group = await GroupService.joinGroup(groupIdToJoin);
      setGroups(groups.map(g => g._id === group._id ? group : g));
      setGroupIdToJoin('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Groups</h2>
      <form onSubmit={handleCreateGroup}>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group Name"
          required
        />
        <button type="submit">Create Group</button>
      </form>
      <form onSubmit={handleJoinGroup}>
        <input
          type="text"
          value={groupIdToJoin}
          onChange={(e) => setGroupIdToJoin(e.target.value)}
          placeholder="Group ID"
          required
        />
        <button type="submit">Join Group</button>
      </form>
      <ul>
        {groups.map((group) => (
          <li key={group._id}>
            <h3>{group.name}</h3>
            <p>Members: {group.members.map((member) => member.username).join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Group;
