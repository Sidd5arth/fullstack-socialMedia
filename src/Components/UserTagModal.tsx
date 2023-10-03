import React from "react";

interface UserTagModalProps {
  followData: { user_id: string; username: string }[];
  taggedUsers: string[];
  onUserTag: (username: string) => void;
  onClose: () => void;
}

const UserTagModal: React.FC<UserTagModalProps> = ({
  followData,
  taggedUsers,
  onUserTag,
  onClose,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 w-80">
        <h2 className="text-lg font-semibold mb-4">Tag Users</h2>
        <ul>
          {followData.map((user) => (
            <li key={user.user_id} className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={taggedUsers.includes(user.username)}
                  onChange={() => onUserTag(user.username)}
                  className="mr-2"
                />
                {user.username}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            className="text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTagModal;
