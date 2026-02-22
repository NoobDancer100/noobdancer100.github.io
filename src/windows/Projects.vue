<script setup lang="ts">
interface Projects {
    title: string
    role: string
    link?: string
}

const projects: Projects[] = [
    {title:"Build and Steal",role:"Additinal Scripting",link:'https://www.roblox.com/games/134879690978154/Build-and-Steal'}
]
</script>

<template>
    <div class="content">
        <h1>Projects</h1>
        <div class="projects">
            <div class="project" v-for="(project, index) in projects" :key="index">
                <h2>Project</h2>
                <h4>{{ project.title }}</h4>
                <h2>Role</h2>
                <h4>{{ project.role }}</h4>

                <a :href="project.link" target="_blank" rel="noopener noreferrer" v-if="project.link">View Project</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.content {
    padding: 5px;

    .projects {
        width: 300px;
        display: flex;

        .project {
            width: 100%;

            border-top: 1px solid #b6b6b6;

            a {
                color: blue;
            }
        }
    }
}
</style>