export default function RmTable(
  { loading = false, head, children, empty }: 
  { loading?: boolean, empty: boolean, head: JSX.Element | string[], children: JSX.Element }
) {
  return (
    <div className="rm-table">
      <table>
        {Array.isArray(head) ? 
        (<thead>
          <tr>{head.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>)
          :
          head}
        {children}
      </table>

      {empty && (
      <div>Empty</div>
      )}

      {loading && (
      <div>loading...</div>
      )}
    </div>
  );
}
