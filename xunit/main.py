class TestCase:
    def __init__(self, name: str) -> None:
        self.name = name

class WasRun(TestCase):
    def __init__(self, name: str) -> None:
        self.was_run = None

        super().__init__(name)

    def run(self) -> None:
        method = getattr(self, self.name)
        method()

    def test_method(self) -> None:
        self.was_run = 1

test = WasRun("test_method")
print(test.was_run)
test.run()
print(test.was_run)
