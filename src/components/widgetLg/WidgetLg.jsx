import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Giao dịch mới nhất</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Khách hàng</th>
          <th className="widgetLgTh">Ngày</th>
          <th className="widgetLgTh">Tổng</th>
          <th className="widgetLgTh">Trạng thái</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://i.pinimg.com/736x/bf/78/c4/bf78c4d7925543977e6902964aa6650e.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Truong Giang</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">122.000 VND</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://i.pinimg.com/736x/bf/78/c4/bf78c4d7925543977e6902964aa6650e.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Truong Giang</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">122.00 VND</td>
          <td className="widgetLgStatus">
            <Button type="Declined" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://i.pinimg.com/736x/bf/78/c4/bf78c4d7925543977e6902964aa6650e.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Truong Giang</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">122.00 VND</td>
          <td className="widgetLgStatus">
            <Button type="Pending" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://i.pinimg.com/736x/bf/78/c4/bf78c4d7925543977e6902964aa6650e.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Truong Giang</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">122.00 VND</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
      </table>
    </div>
  );
}
