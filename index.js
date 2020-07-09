const Navbar = () => {
  return (
    <nav>
      <button>To Do App</button>
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
  };
  const updateValue = e => {
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

  const addCompleteLists = (id, value) => {
    delLists(id);
    setCompleteLists(prev => [...prev, { id: id, value: value }]);
  };
  const delCompleteLists = id => {
    const newCompleteLists = Completelists.filter(list => list.id !== id);
    setCompleteLists(newCompleteLists);
  };
  const updateCompleteLists = (id, value) => {
    delCompleteLists(id);
    setLists(prev => [...prev, { id: id, value: value }]);
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
          placeholder="Enter Task"
        />
        <button type="submit">Add</button>
      </form>
      <div className="task-container">
        <table>
          <tbody>
            {lists.map(list => (
              <ListRender
                id={list.id}
                value={list.value}
                key={list.id}
                delLists={delLists}
                addCompleteLists={addCompleteLists}
              />
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <div className="task-container">
        <table>
          <tbody>
            {Completelists.map(list => (
              <CompleteListRender
                id={list.id}
                value={list.value}
                key={list.id}
                delCompleteLists={delCompleteLists}
                updateCompleteLists={updateCompleteLists}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const ListRender = ({ id, value, delLists, addCompleteLists }) => {
  return (
    <tr>
      <td width="85%">{value}</td>
      <td
        width="7.5%"
        id="checkbox"
        onClick={() => {
          addCompleteLists(id, value);
        }}
      >
        <i className="fa fa-check-square-o"></i>
      </td>
      <td
        width="7.5%"
        id="del"
        onClick={() => {
          delLists(id, value);
        }}
      >
        <i className="fa fa-trash-o buttons"></i>
      </td>
    </tr>
  );
};

const CompleteListRender = ({
  id,
  value,
  delCompleteLists,
  updateCompleteLists
}) => {
  return (
    <tr>
      <td width="85%">{value}</td>
      <td
        width="7.5%"
        id="completed"
        onClick={() => {
          updateCompleteLists(id, value);
        }}
      >
        <i className="fa fa-check-square"></i>
      </td>
      <td
        width="7.5%"
        id="del"
        onClick={() => {
          delCompleteLists(id);
        }}
      >
        <i className="fa fa-trash-o buttons"></i>
      </td>
    </tr>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
