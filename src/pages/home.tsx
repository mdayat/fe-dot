import { Button } from "@components/Button";
import { CheckIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

function Home() {
  return (
    <div>
      <h1>Button Component</h1>

      <section>
        <h2>Shape Variants</h2>
        <div>
          <Button shape="rounded">Rounded Button</Button>
          <Button shape="pill">Pill Button</Button>
          <Button shape="square">Square Button</Button>
        </div>
      </section>

      <section>
        <h2>Size Variants</h2>
        <div>
          <Button size="small">Small Button</Button>
          <Button size="medium">Medium Button</Button>
        </div>
      </section>

      <section>
        <h2>Color Variants</h2>
        <div>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="danger">Danger</Button>
          <Button color="warning">Warning</Button>
          <Button color="info">Info</Button>
        </div>
      </section>

      <section>
        <h2>With Icons</h2>
        <div>
          <Button color="success">
            <CheckIcon />
            Complete Task
          </Button>
          <Button color="primary">
            <PlusIcon />
            Add Task
          </Button>
          <Button color="danger">
            <TrashIcon />
            Delete Task
          </Button>
        </div>
      </section>

      <section>
        <h2>States</h2>
        <div>
          <Button disabled>Disabled Button</Button>
          <Button isLoading>Loading Button</Button>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </section>
    </div>
  );
}

export { Home };
