"use client";

import React from "react";
import { TeamMember } from "@/types/promote";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Globe } from "lucide-react";

interface ProductTeamSectionProps {
    team: TeamMember[];
}

export function ProductTeamSection({ team }: ProductTeamSectionProps) {
    if (!team || team.length === 0) return null;

    return (
        <div className="py-8 border-t">
            <h3 className="text-lg font-semibold mb-6">Makers</h3>
            <div className="flex flex-wrap gap-6">
                {team.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatarUrl} alt={member.name} />
                            <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        <div>
                            <div className="font-medium text-sm">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.role}</div>

                            {member.socials && (
                                <div className="flex gap-2 mt-1">
                                    {member.socials.twitter && (
                                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                        </a>
                                    )}
                                    {member.socials.linkedin && (
                                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                            <Linkedin className="w-3 h-3" />
                                        </a>
                                    )}
                                    {member.socials.github && (
                                        <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                            <Github className="w-3 h-3" />
                                        </a>
                                    )}
                                    {member.socials.website && (
                                        <a href={member.socials.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                            <Globe className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
