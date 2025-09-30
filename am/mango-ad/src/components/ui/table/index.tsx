import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "./Table";

// Add a generic type that may have imageUrl
interface WithImageUrl {
  imageUrl?: string;
}

interface EntityTableProps<T extends WithImageUrl> {
  title: string;
  data: T[];
  columns: {
    key: keyof T | string;
    label: string;
    type?: "text" | "date" | "link" | "avatar" | "image" | "custom";
    subTextKey?: keyof T | string;
    render?: (row: T) => React.ReactNode;
  }[];
}

function EntityTable<T extends WithImageUrl>({ title, data, columns }: EntityTableProps<T>) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={String(col.key)} isHeader>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => {
                const value = (row as any)[col.key];

                // ✅ Custom render
                if (col.type === "custom" && col.render) {
                  return <TableCell key={String(col.key)}>{col.render(row)}</TableCell>;
                }

                // ✅ Image (rounded thumbnail)
                if (col.type === "image") {
                  return (
                    <TableCell key={String(col.key)}>
                      {value ? (
                        <img
                          src={value}
                          alt="product"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  );
                }

                // ✅ Avatar (image + name + subtext)
                if (col.type === "avatar") {
                  const subText = col.subTextKey ? (row as any)[col.subTextKey] : "";
                  const imageSrc = row.imageUrl;

                  return (
                    <TableCell key={String(col.key)}>
                      <div className="flex items-center gap-3">
                        {imageSrc && (
                          <img
                            src={imageSrc}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium">{value}</div>
                          {subText && <div className="text-sm text-gray-500">{String(subText)}</div>}
                        </div>
                      </div>
                    </TableCell>
                  );
                }

                // ✅ Date formatting
                if (col.type === "date" && value) {
                  return <TableCell key={String(col.key)}>{new Date(value).toLocaleDateString()}</TableCell>;
                }

                // ✅ Link
                if (col.type === "link" && value) {
                  return (
                    <TableCell key={String(col.key)}>
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {value}
                      </a>
                    </TableCell>
                  );
                }

                // ✅ Fallback text
                return <TableCell key={String(col.key)}>{value ?? ""}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EntityTable;
export { Table, TableHeader, TableBody, TableRow, TableCell };
