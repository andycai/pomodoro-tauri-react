function TimeCounterCom(props: any) {
  console.info("render TimeCounter");
  return (
      <div className="content">
        <h4 className="title">{props.title}</h4>
        <h1 className="time">{props.data}</h1>
      </div>
  );
}

export default TimeCounterCom;