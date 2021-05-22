const InformationPanel = (props) => {
  const { address } = props;
  return (
    <div>
      <div className="map-address-panel">
        <p>{address}</p>
      </div>

      <style jsx global>
        {`
          .map-address-panel {
            width: 220px;
            padding: 5px;
            height: 40px;
            background: #fff;
            position: absolute;
            left: 0;
            top: -91px;
            box-shadow: 0 1px 3px rgb(41 51 57 / 50%);
          }
        `}
      </style>
    </div>
  );
};

export default InformationPanel;
