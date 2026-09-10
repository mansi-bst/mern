import React from 'react'
import Notes from './Notes'

const paging = () => {
  return (
    <div className="overflow-x-auto">
        <table className="overflow-x-auto">
            <thead>
                <tr>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-300">
                        Title
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-300">
                        Content
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-300">
                        Category
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-300">
                        Priority
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-300">
                        Tags
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-300">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    [...Notes].sorts((a,b))
                }
            </tbody>
        </table>
    </div>
  )
}

export default paging