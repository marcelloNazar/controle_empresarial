import React from "react";

type HeaderContainerProps = {
  selected: string;
  closeModal: () => void;
};

const HeaderModal: React.FC<HeaderContainerProps> = ({
  selected,
  closeModal,
}) => {
  return (
    <div className="modal-header text-black">
      <h1 className="text-xl">{selected}</h1>
      <button onClick={closeModal} className="botao">
        Fechar
      </button>
    </div>
  );
};

export default HeaderModal;
