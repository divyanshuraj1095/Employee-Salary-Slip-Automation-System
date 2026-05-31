import { type DragEvent, useRef, useState } from 'react'
import { FiUploadCloud, FiFile } from 'react-icons/fi'
import { PageHeader } from '../components/PageHeader'
import { Button } from '../components/Button'
import { uploadExcel } from '../api/payrollApi'
import { addActivity } from '../utils/activityLog'

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

export function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [message, setMessage] = useState('')

  const pickFile = (selected: File | null) => {
    if (!selected) return
    const valid =
      selected.name.endsWith('.xlsx') || selected.name.endsWith('.xls')
    if (!valid) {
      setStatus('error')
      setMessage('Please upload an Excel file (.xlsx or .xls).')
      return
    }
    setFile(selected)
    setStatus('idle')
    setMessage('')
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    pickFile(e.dataTransfer.files[0] ?? null)
  }

  const handleUpload = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Select a file before uploading.')
      return
    }
    setStatus('uploading')
    setMessage('')
    try {
      const res = await uploadExcel(file)
      setStatus('success')
      setMessage(
        `${res.message} (${res.employees?.length ?? 0} employees imported)`,
      )
      addActivity(
        'upload',
        'File Uploaded',
        `${file.name} — ${res.employees?.length ?? 0} records`,
      )
      setFile(null)
      if (inputRef.current) inputRef.current.value = ''
    } catch (err: unknown) {
      setStatus('error')
      const msg =
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'message' in err.response.data
          ? String((err.response.data as { message: string }).message)
          : 'Upload failed. Check your file and backend connection.'
      setMessage(msg)
    }
  }

  return (
    <div>
      <PageHeader
        title="Upload Employee Data"
        description="Import employee payroll records from an Excel spreadsheet."
      />

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`rounded-xl border-2 border-dashed px-8 py-16 text-center transition-colors ${
          dragOver
            ? 'border-[#DC2626] bg-red-50/30'
            : 'border-[#E5E7EB] bg-[#FAFAFA]'
        }`}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3F4F6] text-[#DC2626]">
          <FiUploadCloud className="h-7 w-7" />
        </div>
        <p className="text-sm font-medium text-gray-900">
          Drag and drop your Excel file here
        </p>
        <p className="mt-1 text-sm text-[#6B7280]">or click to browse</p>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
        />
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => inputRef.current?.click()}
        >
          Choose File
        </Button>
      </div>

      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm">
          <FiFile className="h-5 w-5 text-[#DC2626]" />
          <span className="flex-1 truncate text-sm font-medium text-gray-900">
            {file.name}
          </span>
          <span className="text-xs text-[#9CA3AF]">
            {(file.size / 1024).toFixed(1)} KB
          </span>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <Button
          loading={status === 'uploading'}
          onClick={handleUpload}
          disabled={!file}
        >
          Upload File
        </Button>
      </div>

      {message && (
        <div
          className={`mt-6 rounded-lg px-4 py-3 text-sm ${
            status === 'success'
              ? 'bg-green-50 text-green-800'
              : status === 'error'
                ? 'bg-red-50 text-[#DC2626]'
                : 'bg-[#F3F4F6] text-gray-700'
          }`}
          role="status"
        >
          <span className="font-medium capitalize">Upload status: </span>
          {status === 'uploading' ? 'Uploading…' : message}
        </div>
      )}
    </div>
  )
}
