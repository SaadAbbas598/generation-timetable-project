import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import InputField from '../components/InputField';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Table from '../components/Table';

const Subjects = () => {
  const [subjects, setSubjects] = useState([
    { name: 'Mathematics', teacher: 'Sophia Martinez' },
    { name: 'English', teacher: 'Olivia Brown' },
    { name: 'History', teacher: 'Ava Wilson' },
    { name: 'Chemistry', teacher: 'James Johnson' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [teacherName, setTeacherName] = useState('');

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!subjectName || !teacherName) return;

    setSubjects([...subjects, { name: subjectName, teacher: teacherName }]);
    setSubjectName('');
    setTeacherName('');
    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    const subject = subjects[index];
    setSubjectName(subject.name);
    setTeacherName(subject.teacher);
    setSubjects(subjects.filter((_, i) => i !== index));
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const columns = [
    { header: 'Subject Name', key: 'name' },
    { header: 'Assigned Teacher', key: 'teacher' },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Subjects</h1>
          <div className="flex gap-2">
            <Button onClick={() => setIsModalOpen(true)}>+ Add</Button>
            <Button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50">x4</Button>
          </div>
        </div>

        {/* Subjects Table */}
        <Table
          columns={columns}
          data={subjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <Modal title="Add New Subject" onClose={() => setIsModalOpen(false)}>
            <form onSubmit={handleAddSubject} className="space-y-4">
              <InputField
                type="text"
                placeholder="Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="Teacher Name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Cancel
                </Button>
                <Button type="submit">Add</Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default Subjects;
