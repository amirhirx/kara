import MemberCard from "@/components/base/MemberCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import {
  getProjectMembers,
  inviteMember,
  removeMember,
} from "@/services/projects";
import type { ProjectMembers, Project } from "@/types";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectSettings(project: Project) {
  const [newMemberEmail, setNewMemberEmail] = useState<string | null>();
  const [projectMembers, setProjectMembers] = useState<ProjectMembers | null>(
    null,
  );

  const inviteNewMemberHandler = () => {
    if (newMemberEmail) {
      inviteMember({ id: project._id, email: newMemberEmail })
        .then((res) => {
          console.log(res);
          toast.add({
            title: res.ok ? "Member added" : "Failed",
            description: res.message ?? "failed to add member",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.add({
            title: "Failed",
          });
        });
    }
  };

  useEffect(() => {
    getProjectMembers({ id: project._id })
      .then((res) => {
        console.log(res);
        setProjectMembers(res);
      })
      .catch((err) => console.log(err));
  }, [project._id]);

  return (
    <div>
      {projectMembers && (
        <>
          <div className="flex justify-between px-2">
            <h2 className="text-lg font-bold">Members</h2>
            <Dialog>
              <DialogTrigger
                render={
                  <Button variant="secondary">
                    <Plus />
                    Invite new member
                  </Button>
                }
              />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite new member</DialogTitle>
                </DialogHeader>
                <Label htmlFor="new-member-email">Email</Label>
                <Input
                  id="new-member-email"
                  name="new-member-email"
                  placeholder="like: example@mail.com"
                  value={newMemberEmail || ""}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
                <DialogFooter>
                  <DialogClose
                    render={<Button variant="outline">Cancel</Button>}
                  />
                  <DialogClose
                    render={
                      <Button onClick={inviteNewMemberHandler} type="submit">
                        Invite
                      </Button>
                    }
                  />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-4 p-2">
            <MemberCard user={projectMembers.owner} role="owner" />
            {projectMembers.members &&
              projectMembers.members.length > 0 &&
              projectMembers.members.map((member) => {
                return (
                  <MemberCard
                    key={member._id}
                    user={member}
                    role="member"
                    canRemove
                    onRemove={() =>
                      removeMember({
                        id: project._id,
                        userId: member._id,
                      })
                        .then((res) => {
                          console.log(res);
                          toast.add({
                            title: res.ok ? "Member removed" : "Failed",
                          });
                        })
                        .catch(() =>
                          toast.add({
                            title: "Failed to remove member",
                          }),
                        )
                    }
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
