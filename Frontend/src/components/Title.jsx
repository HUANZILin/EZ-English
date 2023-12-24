const Title = (props) => {
  return (
    <>
      <h1
        style={{
          paddingTop: "100px",
          textAlign: "center",
          letterSpacing: "2rem",
        }}
      >
        &thinsp;{props.title}
      </h1>
      <hr width="80%" />
    </>
  );
};

export default Title;
