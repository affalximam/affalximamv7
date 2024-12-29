<?php

namespace App\Events;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ProjectChanged implements ShouldBroadcast
{
    public $project;
    public $action;

    public function __construct($project, $action)
    {
        $this->project = $project;
        $this->action = $action;
    }

    public function broadcastOn()
    {
        return ['project-channel'];
    }

    public function broadcastAs()
    {
        return 'project.changed';
    }
}
