const Navbar = () => {
  return (
    <nav>
      <button>To Do List</button>
    </nav>
  );
};

const App = () => {
  const [lists, setLists] = React.useState([{ id: "1", value: "my task" }]);
  const [id, setId] = React.useState("");
  const [value, setValue] = React.useState("");
  const [Completelists, setCompleteLists] = React.useState([
    { id: "2", value: "my completed task" }
  ]);
  const addList = e => {
    e.preventDefault();
    setId(Date.now());
    setLists(prev => [...prev, { id: id, value: value }]);
    console.log(lists);
  };
  const updateValue = e => {
    //     console.log(e.target.value);
    setValue(e.target.value);
    updateId();
  };
  const updateId = () => {
    setId(Date.now());
  };
  const delLists = id => {
    const newLists = lists.filter(list => list.id !== id);
    setLists(newLists);
  };
  //   const updateCompleteLists = (id, value) => {
  //     console.log(id);
  //     console.log(value);
  //     addCompleteLists(id, value);
  //   };
  const addCompleteLists = (id, value) => {
    delLists(id);
    setCompleteLists(prev => [...prev, { id: id, value: value }]);
    console.log(Completelists);
  };
  return (
    <div>
      <Navbar />
      <form onSubmit={addList}>
        <input
          type="text"
          id="value"
          value={value}
          onChange={updateValue}
          placeholder="Enter task"
        />
        <button type="submit">Add</button>
      </form>
      <div className="task-container">
        <ul>
          {lists.map(list => (
            <ListRender
              id={list.id}
              value={list.value}
              key={list.id}
              delLists={delLists}
              addCompleteLists={addCompleteLists}
            />
          ))}
        </ul>
      </div>
      <hr />
      <div className="task-container">
        <ul>
          {Completelists.map(list => (
            <CompleteListRender id={list.id} value={list.value} key={list.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const ListRender = ({ id, value, delLists, addCompleteLists }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td width="85%">{value}</td>
          <td
            id="checkbox"
            onClick={() => {
              addCompleteLists(id, value);
              console.log("clicked");
            }}
          >
            <i className="fa fa-check-square-o"></i>
          </td>
          <td
            id="del"
            onClick={() => {
              delLists(id, value);
            }}
          >
            <i className="fa fa-trash-o buttons"></i>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const CompleteListRender = ({ id, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td width="85%">{value}</td>
          <td id="completed">
            <i className="fa fa-check-square"></i>
          </td>
          <td
            id="del"
            onClick={() => {
              console.log("clicked");
            }}
          >
            <i className="fa fa-trash-o buttons"></i>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
