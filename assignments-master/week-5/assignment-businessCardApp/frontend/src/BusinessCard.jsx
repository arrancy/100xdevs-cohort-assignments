export function BusinessCard(props) {
  return (
    <div style={styles.bigger}>
      <div id="businessCard" style={styles.card}>
        <h2>{props.name}</h2>
        <h4>{props.description}</h4>
        <h3>Interests</h3>
        <p>{props.interest1}</p>
        <p>{props.interest2}</p>
        <p>{props.interest3}</p>
        <button style={styles.btn}>{props.social1}</button>
        <button style={styles.btn2}>{props.social2}</button>
      </div>
    </div>
  );
}

const styles = {
  bigger: {
    textAlign: "center",
  },
  card: {
    textAlign: "left",
    width: "300px",
    height: "300px",
    padding: "3%",
    border: "1px solid black",
    margin: "0 auto 0",
  },

  btn: {
    padding: "0.3rem",
    width: "100px",
    fontSize: "1rem",
    backgroundColor: "#50C4ED",
  },
  btn2: {
    padding: "0.3rem",
    margin: "0 3rem 0",
    width: "100px",
    fontSize: "1rem",
    backgroundColor: "#50C4ED",
  },
};
