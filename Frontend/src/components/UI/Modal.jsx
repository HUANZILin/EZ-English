import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledDialog = styled.dialog`
  margin: 0;
  padding: 2rem;
  position: fixed;
  top: 10vh;
  left: calc(50% - 15rem);
  width: 30rem;
  max-height: 80vh;
  background: #e2e4dd;
  border: none;
  border-radius: 6px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: slide-down-fade-in 300ms ease-out forwards;

  &::backdrop {
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
  }

  @keyframes slide-down-fade-in {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default function Modal({ children }) {
  const dialog = useRef();

  useEffect(() => {
    // Using useEffect to sync the Modal component with the DOM Dialog API
    // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close(); // needed to avoid error being thrown
    };
  }, []);

  return createPortal(
    <StyledDialog ref={dialog}>{children}</StyledDialog>,
    document.getElementById("modal")
  );
}
