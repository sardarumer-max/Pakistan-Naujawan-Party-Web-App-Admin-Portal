export function LoadingSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}>
                <div className="skeleton" style={{ height: 10, width: '60%' }} />
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, ri) => (
            <tr key={ri}>
              {Array.from({ length: cols }).map((_, ci) => (
                <td key={ci}>
                  <div
                    className="skeleton"
                    style={{
                      height: 13,
                      width: `${50 + Math.random() * 40}%`,
                    }}
                  />
                </td>
              ))}
              <td>
                <div className="skeleton" style={{ height: 13, width: 60 }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
