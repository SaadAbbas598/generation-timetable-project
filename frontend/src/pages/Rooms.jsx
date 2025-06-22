import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import Table from '../components/Table';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Modal from '../components/Modal';

const Rooms = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Room 101', type: 'Classroom', capacity: 40 },
    { id: 2, name: 'Lab A', type: 'Computer Lab', capacity: 30 },
    { id: 3, name: 'Room 102', type: 'Classroom', capacity: 50 },
  ]);

  const [assignments, setAssignments] = useState([
    { id: 1, subject: 'Data Structures', teacher: 'Mr. Ali', roomId: 1 },
    { id: 2, subject: 'Operating Systems', teacher: 'Ms. Sana', roomId: 2 },
  ]);

  const [formData, setFormData] = useState({ subject: '', teacher: '', roomId: '' });
  const [roomData, setRoomData] = useState({ name: '', type: '', capacity: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);

  const getRoomName = (roomId) => {
    const room = rooms.find((r) => r.id === parseInt(roomId));
    return room ? `${room.name} (${room.type})` : 'Not Assigned';
  };

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    const { subject, teacher, roomId } = formData;
    if (!subject || !teacher || !roomId) return;

    const newAssignment = {
      id: editIndex !== null ? assignments[editIndex].id : Date.now(),
      subject,
      teacher,
      roomId: parseInt(roomId),
    };

    if (editIndex !== null) {
      const updated = [...assignments];
      updated[editIndex] = newAssignment;
      setAssignments(updated);
      setEditIndex(null);
    } else {
      setAssignments([...assignments, newAssignment]);
    }

    setFormData({ subject: '', teacher: '', roomId: '' });
    setShowAssignmentModal(false);
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    const { name, type, capacity } = roomData;
    if (!name || !type || !capacity) return;

    const newRoom = {
      id: Date.now(),
      name,
      type,
      capacity: parseInt(capacity),
    };

    setRooms([...rooms, newRoom]);
    setRoomData({ name: '', type: '', capacity: '' });
    setShowRoomModal(false);
  };

  const handleEdit = (index) => {
    const current = assignments[index];
    setFormData({ subject: current.subject, teacher: current.teacher, roomId: current.roomId });
    setEditIndex(index);
    setShowAssignmentModal(true);
  };

  const handleDelete = (index) => {
    const updated = [...assignments];
    updated.splice(index, 1);
    setAssignments(updated);
  };

  const assignmentColumns = [
    { key: 'subject', header: 'Subject' },
    { key: 'teacher', header: 'Teacher' },
    {
      header: 'Assigned Room',
      accessor: (row) => getRoomName(row.roomId),
    },
  ];

  const roomColumns = [
    { key: 'name', header: 'Room Name' },
    { key: 'type', header: 'Type' },
    { key: 'capacity', header: 'Capacity' },
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Room Assignments</h2>
          <div className="flex gap-2">
            <Button onClick={() => setShowAssignmentModal(true)}>Add Assignment</Button>
            <Button onClick={() => setShowRoomModal(true)}>Add Room</Button>
          </div>
        </div>

        <Table columns={assignmentColumns} data={assignments} onEdit={handleEdit} onDelete={handleDelete} />

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Room Inventory</h3>
          <Table columns={roomColumns} data={rooms} />
        </div>
      </div>

      {showAssignmentModal && (
        <Modal
          title={editIndex !== null ? 'Update Assignment' : 'Add Assignment'}
          onClose={() => {
            setShowAssignmentModal(false);
            setEditIndex(null);
            setFormData({ subject: '', teacher: '', roomId: '' });
          }}
        >
          <form onSubmit={handleAssignmentSubmit} className="space-y-4">
            <InputField
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
            <InputField
              type="text"
              placeholder="Teacher"
              value={formData.teacher}
              onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            />
            <select
              value={formData.roomId}
              onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
              className="border rounded-xl p-2 w-full"
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} ({room.type})
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-3 pt-2">
              <Button type="submit">{editIndex !== null ? 'Update' : 'Add'}</Button>
            </div>
          </form>
        </Modal>
      )}

      {showRoomModal && (
        <Modal
          title="Add Room"
          onClose={() => {
            setShowRoomModal(false);
            setRoomData({ name: '', type: '', capacity: '' });
          }}
        >
          <form onSubmit={handleRoomSubmit} className="space-y-4">
            <InputField
              type="text"
              placeholder="Room Name"
              value={roomData.name}
              onChange={(e) => setRoomData({ ...roomData, name: e.target.value })}
            />
            <InputField
              type="text"
              placeholder="Room Type"
              value={roomData.type}
              onChange={(e) => setRoomData({ ...roomData, type: e.target.value })}
            />
            <InputField
              type="number"
              placeholder="Capacity"
              value={roomData.capacity}
              onChange={(e) => setRoomData({ ...roomData, capacity: e.target.value })}
            />
            <div className="flex justify-end space-x-3 pt-2">
              <Button type="submit">Add</Button>
            </div>
          </form>
        </Modal>
      )}
    </Layout>
  );
};

export default Rooms;
