import React from "react";

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <table className="min-w-full border border-gray-200">{children}</table>
);

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <thead className="bg-gray-100">{children}</thead>
);

export const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tbody>{children}</tbody>
);

export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tr className="border-b">{children}</tr>
);

export const TableCell: React.FC<{ children: React.ReactNode; isHeader?: boolean }> = ({
  children,
  isHeader,
}) =>
  isHeader ? (
    <th className="px-4 py-2 text-left font-semibold">{children}</th>
  ) : (
    <td className="px-4 py-2">{children}</td>
  );
