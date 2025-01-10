"use client"

import React, {useState} from 'react'

interface SidebarProps {
    onSelect: (component: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({onSelect}) => {
    const [showDropdown, setShowDropdown] = useState(false)

    const handleDropdown = () => {
        setShowDropdown(!showDropdown)
    }
  return (
    <div>
      <ul>
        <li onClick={() => onSelect("Profile")}>Profile</li>
        <li onClick={handleDropdown}>Vehicle Management</li>
        {
            showDropdown && (
                <ul>
                    <li onClick={() => onSelect("VehicleProfile")}>Vehicle Profile</li>
                    <li onClick={() => onSelect("VehicleManagement")}>Vehicle Management</li>
                </ul>
            )
        }
        <li onClick={() => onSelect("History")}>History</li>
        <li onClick={() => onSelect("AiSetting")}>AI Setting</li>
      </ul>
    </div>
  )
}

export default Sidebar
