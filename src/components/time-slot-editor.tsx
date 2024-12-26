
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Save, X, Trash } from "lucide-react";
import { TimeSlot } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TimeSlotEditorProps {
  timeSlot: TimeSlot;
  index: number;
  onSave: (index: number, start: string, end: string) => Promise<void>;
  onDelete: (index: number) => Promise<void>;
}

export function TimeSlotEditor({
  timeSlot,
  index,
  onSave,
  onDelete,
}: TimeSlotEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [start, setStart] = useState(timeSlot.start);
  const [end, setEnd] = useState(timeSlot.end);
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling the modal

  const handleSave = () => {
    onSave(index, start, end);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(index);
    setIsModalOpen(false); // Close modal after deleting
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-24"
        />
        <span>-</span>
        <Input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="w-24"
        />
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
            <X className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={handleSave}>
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div>
        {timeSlot.start} - {timeSlot.end}
      </div>
      <div className="flex gap-1 justify-evenly w-full">
        <Button variant="ghost" className="p-0" onClick={() => setIsEditing(true)}>
          <Edit2 className="h-4 w-4" />
        </Button>

        {/* Alert Dialog for delete confirmation */}
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="p-0" onClick={() => setIsModalOpen(true)}>
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you really want to delete this time slot? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsModalOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
