const Group = require('../models/Group'); // Ensure this import is present

exports.createGroup = async (req, res) => {
  const { name } = req.body;

  try {
    const newGroup = new Group({ name, members: [req.user.id] });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.joinGroup = async (req, res) => {
  const { groupId } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (group.members.includes(req.user.id)) {
      return res.status(400).json({ error: 'You are already a member of this group' });
    }

    group.members.push(req.user.id);
    await group.save();

    res.status(200).json(group);
  } catch (err) {
    console.error('Error in joinGroup:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
