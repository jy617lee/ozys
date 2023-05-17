import React, { useState, useRef, useEffect, ReactNode } from "react";
import styled from "styled-components";
import { MdArrowDropDown } from "react-icons/md";

interface Props {
  menuButton: ReactNode;
  menuList: ReactNode[];
  onSelect: (index: number) => void;
  maxVisible?: number;
  width?: number;
}

const Dropdown: React.FC<Props> = ({
  menuButton,
  menuList,
  onSelect,
  maxVisible = 10,
  width = 250,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  const node = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (itemRef.current && !maxHeight) {
      const itemHeight = itemRef.current.offsetHeight;
      const itemNumber = Math.min(menuList.length, maxVisible);
      setMaxHeight(itemHeight * itemNumber);
    }
  }, [menuList, isOpen]);

  const handleClickOutside = (e: MouseEvent) => {
    if (node.current?.contains(e.target as Node)) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContainer width={width} ref={node}>
      <MenuButtonContainer onClick={() => setIsOpen(!isOpen)}>
        {menuButton}
        <MdArrowDropDown size={24} color='blue' />
      </MenuButtonContainer>
      {isOpen && (
        <MenuListContainer max={maxHeight}>
          {menuList.map((item, index) => (
            <MenuItem
              ref={index === 0 ? itemRef : null}
              key={index}
              onClick={() => {
                setIsOpen(false);
                onSelect(index);
              }}
            >
              {item}
            </MenuItem>
          ))}
        </MenuListContainer>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  position: relative;
`;

const MenuButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 10px;
  background-color: #ccc;
  border-radius: 10px;
  padding: 13px;
`;

const MenuListContainer = styled.div<{ max: number }>`
  position: absolute;
  width: 100%;
  max-height: ${({ max }) => max}px;
  overflow-y: auto;
  background-color: white;
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 7px;
`;

export default Dropdown;
