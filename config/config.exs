# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :lightspeedweb,
  namespace: LightspeedWeb,
  ecto_repos: [LightspeedWeb.Repo]

# Configures the endpoint
config :lightspeedweb, LightspeedWebWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "6ymm8RN5T27eeNHvhJZmTrE/l0/y/OWY9F0PL2T8LSTBARPPsuiPAVx1F5tG4dGo",
  render_errors: [view: LightspeedWebWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: LightspeedWeb.PubSub,
  live_view: [signing_salt: "2R4S5ij4"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
