/**
 * Client-side CSV download. Mirrors aio-website's ExportCsvButton — takes an
 * array of rows + headers, builds a Blob with proper escaping, triggers a
 * download. No server round-trip.
 */

'use client'

type Row = Record<string, string | number | boolean | null | undefined>

function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return ''
  const s = String(value)
  if (s.includes('"') || s.includes(',') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

function toCsv(rows: Row[], headers: { key: string; label: string }[]) {
  const headerLine = headers.map((h) => escapeCell(h.label)).join(',')
  const lines = rows.map((row) =>
    headers.map((h) => escapeCell(row[h.key])).join(','),
  )
  return [headerLine, ...lines].join('\r\n') + '\r\n'
}

export default function ExportCsvButton({
  rows,
  headers,
  filename,
  className,
}: {
  rows: Row[]
  headers: { key: string; label: string }[]
  filename: string
  className?: string
}) {
  function handleClick() {
    const csv = toCsv(rows, headers)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={rows.length === 0}
      className={`btn btn-white ${className ?? ''}`}
    >
      Export CSV ({rows.length})
    </button>
  )
}
