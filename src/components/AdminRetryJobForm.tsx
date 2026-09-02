'use client';

import { useState } from 'react';

export function AdminRetryJobForm() {
  const [jobId, setJobId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/retry-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: Number(jobId) }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || 'Something went wrong retrying the job.');

      setSuccess(data.jobId);
      setJobId('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong retrying the job.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-16 pt-10 border-t border-[#2D2640]/10">
      <h2 className="font-serif text-xl text-[#2D2640] mb-2">Retry a stuck job</h2>
      <p className="text-sm text-[#655E78] mb-6">
        Re-runs generation for an existing generation_jobs id — for one held at &quot;held-for-review&quot;.
      </p>
      <form onSubmit={handleSubmit} className="flex items-end gap-4">
        <div className="flex-1">
          <label htmlFor="jobId" className="block text-sm text-[#655E78] mb-2">
            Job ID
          </label>
          <input
            id="jobId"
            type="number"
            required
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30 transition-colors text-[#2D2640]"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 rounded-lg bg-[#2D2640] text-[#F0EBF8] text-sm tracking-wide hover:bg-[#1E1835] transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Starting...' : 'Retry'}
        </button>
      </form>

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
      {success != null && (
        <p className="text-sm text-[#655E78] mt-4">
          Job #{success} started. It&apos;ll email the customer directly once it finishes generating.
        </p>
      )}
    </div>
  );
}
