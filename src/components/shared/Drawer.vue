<template>
  <v-navigation-drawer app expand-on-hover>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar color="blue">
          <span class="white--text headline">{{
            `${user.first_name[0]}${user.last_name[0]}`
          }}</span>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link @click="$router.push('/')">
        <v-list-item-content>
          <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense v-for="(item, i) in items" :key="i">
      <v-list-item
        link
        :to="{ name: item.name }"
        v-if="!item.subMenu && item.show"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-list-group no-action :prepend-icon="item.icon" v-else>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.subMenu"
          :key="child.title"
          :to="{ name: child.name }"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"

export default Vue.extend({
  data() {
    return {}
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    items() {
      return [
        {
          name: "user.index",
          title: this.$t("text.drawer.users"),
          icon: "people",
          show: true
        },
        {
          name: "company-groups.index",
          title: this.$t("text.drawer.groups"),
          icon: "loyalty",
          show: true
        },
        {
          name: "newsletter.index",
          title: this.$t("text.drawer.newsletters"),
          icon: "mail_outline",
          show: true
        },
        {
          name: "form.index",
          title: this.$t("text.drawer.forms"),
          icon: "article",
          show: true
        },
        {
          title: this.$t("text.drawer.projects"),
          icon: "label",
          subMenu: [
            {
              name: "project-status.index",
              title: this.$t("text.drawer.project_status"),
              show: true
            },
            {
              name: "project.index",
              title: this.$t("text.drawer.projects"),
              show: true
            }
          ]
        },
        {
          title: this.$t("text.drawer.tasks"),
          icon: "assignment_turned_in",
          subMenu: [
            {
              name: "task-status.index",
              title: this.$t("text.drawer.task_status"),
              show: true
            },
            {
              name: "task.index",
              title: this.$t("text.drawer.tasks"),
              show: true
            }
          ]
        }
      ]
    }
  }
})
</script>
